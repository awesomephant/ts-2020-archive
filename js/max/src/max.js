const maxStartEl = document.querySelector(".start-max");
const maxContainer = document.querySelector(".max-container");
const defaultSize = 30;

const design = {
    "grids": {
        "6x8": {
            "columns": 6,
            "rows": 8,
            "letters": {
                "a": "011110 100001 100001 100001 111111 100001 100001 100001",
                "b": "111110 100001 100001 111110 100001 100001 100001 111110",
                "c": "011111 100000 100000 100000 100000 100000 100000 011111",
                "d": "111110 100001 100001 100001 100001 100001 100001 111110",
                "e": "011111 100000 100000 111111 100000 100000 100000 011111",
                "f": "011111 100000 100000 111111 100000 100000 100000 100000",
                "g": "011111 100000 100000 100111 100001 100001 100001 011110",
                "h": "100001 100001 100001 111111 100001 100001 100001 100001",
                "i": "111110 001000 001000 001000 001000 001000 001000 111110",
                "j": "100000 100000 100000 100000 100001 100001 100001 011110",
                "k": "100001 100010 100100 111000 101000 100100 100010 100001",
                "l": "100000 100000 100000 100000 100000 100000 100000 011111",
                "m": "100010 110110 101010 100010 100010 100010 100010 100010",
                "n": "001100 010010 100001 100001 100001 100001 100001 100001",
                "o": "011110 100001 100001 100001 100001 100001 100001 011110",
                "p": "011110 100001 100001 100001 111110 100000 100000 100000",
                "q": "011110 100001 100001 100001 101001 100101 100011 011100",
                "r": "011110 100001 100001 100001 111110 100100 100010 100001",
                "s": "011111 100000 100000 011110 000001 000001 000001 111110",
                "t": "111110 001000 001000 001000 001000 001000 001000 001000",
                "u": "100001 100001 100001 100001 100001 100001 100001 011110",
                "v": "100001 100001 100001 100001 100001 100001 010010 001100",
                "w": "100001 100001 100001 100001 100001 100001 101101 010010",
                "x": "100001 010010 001100 001100 001100 001100 010010 100001",
                "y": "100001 100001 100001 100001 111110 100000 100000 011111",
                "z": "111111 000001 000010 000100 001000 010000 100000 111111",
            }
        }
    }
}
class Shape extends React.Component {
    render() {
        if (this.props.shape === 'circle') {
            return (
                <g transform={this.props.position}>
                    <g transform={this.props.rotate}>
                        <circle transform={this.props.transform} key={'element-' + this.props.id} className='element' cx={this.props.width / 2} cy={this.props.width / 2} r={this.props.width}></circle>
                    </g>
                </g>
            )
        } else if (this.props.shape === 'rect') {
            return (
                <g transform={this.props.position}>
                    <g transform={this.props.rotate}>
                        <rect transform={this.props.transform} key={'element-' + this.props.id} className='element' x={0} y={0} width={this.props.width} height={this.props.height}></rect>
                    </g>
                </g>
            )
        }
    }
}
class TextInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.updateSetting(this.props.id, e.target.value)
    }
    render() {
        return (
            <div className='setting text'>
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <input className='text-input' onChange={this.handleChange} name={this.props.id} type='text' value={this.props.value}></input>
            </div>
        )
    }
}

class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.updateSetting(this.props.id, parseFloat(e.target.value))
    }
    render() {
        let valueStyle = {
            left: ((this.props.value / this.props.max) * 100) + '%'
        }
        return (
            <div className='setting slider'>
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <div className='slider-track'>
                    <input className='slider-input' onChange={this.handleChange} name={this.props.id} type='range' min={this.props.min} max={this.props.max} step={this.props.step} value={this.props.value}></input>
                    <div style={valueStyle} className='slider-value'>
                        <input className='value-input' onChange={this.handleChange} name={this.props.id} type='number' min={this.props.min} max={this.props.max} step={this.props.step} value={this.props.value}></input>
                    </div>
                </div>
            </div>
        )
    }
}

class Glyph extends React.Component {
    render() {
        const rows = []
        const cols = []
        const elements = []
        let g = design.grids[this.props.settings.gridID];
        if (this.props.settings.gridActive) {
            // Draw Rows
            for (let i = 0; i < this.props.settings.gridRows; i++) {
                let x1 = (this.props.settings.gridSkew / (this.props.settings.gridRows - 1)) * i + this.props.x;
                let y1 = i * this.props.settings.cellHeight + this.props.y;
                let x2 = ((this.props.settings.gridColumns - 1) * this.props.settings.cellWidth) + ((this.props.settings.gridSkew) / (this.props.settings.gridRows - 1) * i) + this.props.x;
                let y2 = i * this.props.settings.cellHeight + this.props.y;
                rows.push(<line vectorEffect="non-scaling-stroke" key={'row-' + i} x1={x1} y1={y1} x2={x2} y2={y2}></line>)
            }

            // Draw Columns
            for (let i = 0; i < this.props.settings.gridColumns; i++) {
                let x1 = i * this.props.settings.cellWidth + this.props.x;
                let y1 = this.props.y;
                let x2 = i * this.props.settings.cellWidth + this.props.x + parseFloat(this.props.settings.gridSkew);
                let y2 = ((this.props.settings.gridRows - 1) * this.props.settings.cellHeight) + this.props.y;
                cols.push(<line vectorEffect="non-scaling-stroke" key={'col-' + i} x1={x1} y1={y1} x2={x2} y2={y2}></line>)
            }
        }
        const positionsList = g.letters[this.props.g].replace(/ /g, '').split('');
        for (let i = 0; i < positionsList.length; i++) {
            let row = Math.floor(i / g.columns);
            const pos = [(i - row * g.columns), row]
            let widthScaled = defaultSize * this.props.settings.elementScaleX;
            let heightScaled = defaultSize * this.props.settings.elementScaleY;
            let gridPointX = (pos[0] * this.props.settings.cellWidth) + (this.props.settings.gridSkew / (this.props.settings.gridRows - 1) * pos[1]) + this.props.x;
            let x = (gridPointX / this.props.settings.elementScaleX);
            let y = ((pos[1] * this.props.settings.cellHeight) + this.props.y) / this.props.settings.elementScaleY;

            let rotate = `rotate(${this.props.settings.elementRotation}, ${x * this.props.settings.elementScaleX}, ${y * this.props.settings.elementScaleY})`;
            let transform = `translate(${-widthScaled / 2} ${-heightScaled / 2}) scale(${this.props.settings.elementScaleX} ${this.props.settings.elementScaleY}) translate(${x} ${y})`;

            if (positionsList[i] === "1") {
                elements.push(
                    <Shape key={`shape-${i}`} shape={this.props.settings.elementShape} rotate={rotate} transform={transform} width={defaultSize} height={defaultSize} id={i}></Shape>
                )
            }
        }


        return (
            <g>
                {elements}
                {rows}
                {cols}
            </g>
        )
    }
}

class Dropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const setting = this.props.id;
        this.props.updateSetting(setting, e.target.value)
    }
    render() {
        const optionItems = this.props.options.map((op) => {
            return (<option key={`op-${op}`} value={op}>{op}</option>)
        })
        return (
            <div className='setting dropdown'>
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <select value={this.props.value} id={this.props.id} onChange={this.handleChange}>
                    {optionItems}
                </select>
            </div>
        )
    }
}

class Settings extends React.Component {
    render() {
        return (
            <div className='settings'>
                <TextInput updateSetting={this.props.updateSetting} value={this.props.settings.text} title='Text' id='text'></TextInput>

                <Dropdown updateSetting={this.props.updateSetting} options={['circle', 'rect']} value={this.props.settings.elementShape} id='elementShape' title='Element Shape'></Dropdown>

                <Slider updateSetting={this.props.updateSetting} value={this.props.settings.elementScaleX} title='Element Scale X' id='elementScaleX' min='0.01' max='10' step='.1'></Slider>

                <Slider updateSetting={this.props.updateSetting} value={this.props.settings.elementScaleY} title='Element Scale Y' id='elementScaleY' min='0.01' max='10' step='.1'></Slider>

                <Slider updateSetting={this.props.updateSetting} value={this.props.settings.elementRotation} title='Element Rotation' id='elementRotation' min='0' max='360' step='.1'></Slider>

                <Slider updateSetting={this.props.updateSetting} value={this.props.settings.gridSkew} title='Grid Skew' id='gridSkew' min='-350' max='350' step='.001'></Slider>

                <Slider updateSetting={this.props.updateSetting} value={this.props.settings.cellHeight} title='Cell Height' id='cellHeight' min='5' max='150' step='.001'></Slider>
                <Slider updateSetting={this.props.updateSetting} value={this.props.settings.cellWidth} title='Cell Width' id='cellWidth' min='5' max='150' step='.001'></Slider>
                <Slider updateSetting={this.props.updateSetting} value={this.props.settings.spacing} title='Spacing' id='spacing' min='-150' max='150' step='.001'></Slider>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            editModeEnabled: false,
            settings: {
                gridID: "6x8",
                gridColumns: 6,
                gridRows: 8,
                gridSkew: 12,
                gridActive: true,
                padding: 100,
                elementScaleX: 1.5,
                elementScaleY: 1.5,
                elementRotation: 20,
                elementShape: 'circle',
                smoothing: 20,
                cellWidth: 30,
                cellHeight: 40,
                smoothing: 10,
                spacing: 17,
                text: "Space"
            }

        }
        this.updateSetting = this.updateSetting.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentDidMount() {
        this.updateWindowDimensions()
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    updateSetting(setting, value) {
        this.setState((prevState) => {
            if (prevState.settings[setting] !== null) {
                prevState.settings[setting] = value;
            } else {
                console.error(`Attempted to update non-existing setting ${setting}`)
            }
            return prevState;
        })
    }

    render() {
        const letters = this.state.settings.text.toLowerCase().split('');
        const gridWidth = this.state.settings.gridColumns * this.state.settings.cellWidth + defaultSize * this.state.settings.elementScaleX + this.state.settings.spacing;
        const gridHeight = this.state.settings.gridRows * this.state.settings.cellHeight;
        let baseX = (this.state.width / 2) - ((gridWidth / 2) * letters.length);
        let baseY = (this.state.height / 2) - (gridHeight / 2)

        const glyphs = letters.map((g, i) => {
            if (design.grids[this.state.settings.gridID].letters[g]) {
                currentX = baseX + gridWidth * i
                return (
                    <Glyph key={`glyph-${i}`} settings={this.state.settings} g={g} y={baseY} x={currentX}></Glyph>
                )
            }
        })


        const containerWidth = (this.state.settings.gridColumns - 1) * this.state.settings.cellWidth + Math.abs(this.state.settings.gridSkew) + (defaultSize * this.state.settings.elementScaleX * 4)
        const containerHeight = this.state.settings.gridRows * this.state.settings.cellHeight + (defaultSize * this.state.settings.elementScaleY * 2)
        return (
            <div>
                <svg className='testPreview' width={this.state.width} height={this.state.height}>{glyphs}</svg>
                <Settings updateSetting={this.updateSetting} settings={this.state.settings}></Settings>
            </div>
        );
    }
}

function initMax() {
    // Let's throw a react app into this mix
    const domContainer = document.querySelector('.max-container');
    ReactDOM.render(<App />, domContainer);
}

maxStartEl.addEventListener("click", (e) => {
    e.stopPropagation()
    maxContainer.classList.add('active')
})
initMax()

maxContainer.addEventListener('click', (e) => {
    if (e.clientX > window.innerWidth / 2){
        maxContainer.classList.remove('active')
    }
})