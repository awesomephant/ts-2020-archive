var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var maxStartEl = document.querySelector(".start-max");
var maxContainer = document.querySelector(".max-container");
var defaultSize = 30;

var design = {
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
                "z": "111111 000001 000010 000100 001000 010000 100000 111111"
            }
        }
    }
};

var Shape = function (_React$Component) {
    _inherits(Shape, _React$Component);

    function Shape() {
        _classCallCheck(this, Shape);

        return _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).apply(this, arguments));
    }

    _createClass(Shape, [{
        key: "render",
        value: function render() {
            if (this.props.shape === 'circle') {
                return React.createElement(
                    "g",
                    { transform: this.props.position },
                    React.createElement(
                        "g",
                        { transform: this.props.rotate },
                        React.createElement("circle", { transform: this.props.transform, key: 'element-' + this.props.id, className: "element", cx: this.props.width / 2, cy: this.props.width / 2, r: this.props.width })
                    )
                );
            } else if (this.props.shape === 'rect') {
                return React.createElement(
                    "g",
                    { transform: this.props.position },
                    React.createElement(
                        "g",
                        { transform: this.props.rotate },
                        React.createElement("rect", { transform: this.props.transform, key: 'element-' + this.props.id, className: "element", x: 0, y: 0, width: this.props.width, height: this.props.height })
                    )
                );
            }
        }
    }]);

    return Shape;
}(React.Component);

var TextInput = function (_React$Component2) {
    _inherits(TextInput, _React$Component2);

    function TextInput(props) {
        _classCallCheck(this, TextInput);

        var _this2 = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

        _this2.handleChange = _this2.handleChange.bind(_this2);
        return _this2;
    }

    _createClass(TextInput, [{
        key: "handleChange",
        value: function handleChange(e) {
            this.props.updateSetting(this.props.id, e.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "setting text" },
                React.createElement(
                    "label",
                    { htmlFor: this.props.id },
                    this.props.title
                ),
                React.createElement("input", { className: "text-input", onChange: this.handleChange, name: this.props.id, type: "text", value: this.props.value })
            );
        }
    }]);

    return TextInput;
}(React.Component);

var Slider = function (_React$Component3) {
    _inherits(Slider, _React$Component3);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this3 = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

        _this3.handleChange = _this3.handleChange.bind(_this3);
        return _this3;
    }

    _createClass(Slider, [{
        key: "handleChange",
        value: function handleChange(e) {
            this.props.updateSetting(this.props.id, parseFloat(e.target.value));
        }
    }, {
        key: "render",
        value: function render() {
            var valueStyle = {
                left: this.props.value / this.props.max * 100 + '%'
            };
            return React.createElement(
                "div",
                { className: "setting slider" },
                React.createElement(
                    "label",
                    { htmlFor: this.props.id },
                    this.props.title
                ),
                React.createElement(
                    "div",
                    { className: "slider-track" },
                    React.createElement("input", { className: "slider-input", onChange: this.handleChange, name: this.props.id, type: "range", min: this.props.min, max: this.props.max, step: this.props.step, value: this.props.value }),
                    React.createElement(
                        "div",
                        { style: valueStyle, className: "slider-value" },
                        React.createElement("input", { className: "value-input", onChange: this.handleChange, name: this.props.id, type: "number", min: this.props.min, max: this.props.max, step: this.props.step, value: this.props.value })
                    )
                )
            );
        }
    }]);

    return Slider;
}(React.Component);

var Glyph = function (_React$Component4) {
    _inherits(Glyph, _React$Component4);

    function Glyph() {
        _classCallCheck(this, Glyph);

        return _possibleConstructorReturn(this, (Glyph.__proto__ || Object.getPrototypeOf(Glyph)).apply(this, arguments));
    }

    _createClass(Glyph, [{
        key: "render",
        value: function render() {
            var rows = [];
            var cols = [];
            var elements = [];
            var g = design.grids[this.props.settings.gridID];
            if (this.props.settings.gridActive) {
                // Draw Rows
                for (var i = 0; i < this.props.settings.gridRows; i++) {
                    var x1 = this.props.settings.gridSkew / (this.props.settings.gridRows - 1) * i + this.props.x;
                    var y1 = i * this.props.settings.cellHeight + this.props.y;
                    var x2 = (this.props.settings.gridColumns - 1) * this.props.settings.cellWidth + this.props.settings.gridSkew / (this.props.settings.gridRows - 1) * i + this.props.x;
                    var y2 = i * this.props.settings.cellHeight + this.props.y;
                    rows.push(React.createElement("line", { vectorEffect: "non-scaling-stroke", key: 'row-' + i, x1: x1, y1: y1, x2: x2, y2: y2 }));
                }

                // Draw Columns
                for (var _i = 0; _i < this.props.settings.gridColumns; _i++) {
                    var _x = _i * this.props.settings.cellWidth + this.props.x;
                    var _y = this.props.y;
                    var _x2 = _i * this.props.settings.cellWidth + this.props.x + parseFloat(this.props.settings.gridSkew);
                    var _y2 = (this.props.settings.gridRows - 1) * this.props.settings.cellHeight + this.props.y;
                    cols.push(React.createElement("line", { vectorEffect: "non-scaling-stroke", key: 'col-' + _i, x1: _x, y1: _y, x2: _x2, y2: _y2 }));
                }
            }
            var positionsList = g.letters[this.props.g].replace(/ /g, '').split('');
            for (var _i2 = 0; _i2 < positionsList.length; _i2++) {
                var row = Math.floor(_i2 / g.columns);
                var pos = [_i2 - row * g.columns, row];
                var widthScaled = defaultSize * this.props.settings.elementScaleX;
                var heightScaled = defaultSize * this.props.settings.elementScaleY;
                var gridPointX = pos[0] * this.props.settings.cellWidth + this.props.settings.gridSkew / (this.props.settings.gridRows - 1) * pos[1] + this.props.x;
                var x = gridPointX / this.props.settings.elementScaleX;
                var y = (pos[1] * this.props.settings.cellHeight + this.props.y) / this.props.settings.elementScaleY;

                var rotate = "rotate(" + this.props.settings.elementRotation + ", " + x * this.props.settings.elementScaleX + ", " + y * this.props.settings.elementScaleY + ")";
                var transform = "translate(" + -widthScaled / 2 + " " + -heightScaled / 2 + ") scale(" + this.props.settings.elementScaleX + " " + this.props.settings.elementScaleY + ") translate(" + x + " " + y + ")";

                if (positionsList[_i2] === "1") {
                    elements.push(React.createElement(Shape, { key: "shape-" + _i2, shape: this.props.settings.elementShape, rotate: rotate, transform: transform, width: defaultSize, height: defaultSize, id: _i2 }));
                }
            }

            return React.createElement(
                "g",
                null,
                elements,
                rows,
                cols
            );
        }
    }]);

    return Glyph;
}(React.Component);

var Dropdown = function (_React$Component5) {
    _inherits(Dropdown, _React$Component5);

    function Dropdown() {
        _classCallCheck(this, Dropdown);

        var _this5 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this));

        _this5.state = {
            selected: 0
        };
        _this5.handleChange = _this5.handleChange.bind(_this5);
        return _this5;
    }

    _createClass(Dropdown, [{
        key: "handleChange",
        value: function handleChange(e) {
            var setting = this.props.id;
            this.props.updateSetting(setting, e.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            var optionItems = this.props.options.map(function (op) {
                return React.createElement(
                    "option",
                    { key: "op-" + op, value: op },
                    op
                );
            });
            return React.createElement(
                "div",
                { className: "setting dropdown" },
                React.createElement(
                    "label",
                    { htmlFor: this.props.id },
                    this.props.title
                ),
                React.createElement(
                    "select",
                    { value: this.props.value, id: this.props.id, onChange: this.handleChange },
                    optionItems
                )
            );
        }
    }]);

    return Dropdown;
}(React.Component);

var Settings = function (_React$Component6) {
    _inherits(Settings, _React$Component6);

    function Settings() {
        _classCallCheck(this, Settings);

        return _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).apply(this, arguments));
    }

    _createClass(Settings, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "settings" },
                React.createElement(TextInput, { updateSetting: this.props.updateSetting, value: this.props.settings.text, title: "Text", id: "text" }),
                React.createElement(Dropdown, { updateSetting: this.props.updateSetting, options: ['circle', 'rect'], value: this.props.settings.elementShape, id: "elementShape", title: "Element Shape" }),
                React.createElement(Slider, { updateSetting: this.props.updateSetting, value: this.props.settings.elementScaleX, title: "Element Scale X", id: "elementScaleX", min: "0.01", max: "10", step: ".1" }),
                React.createElement(Slider, { updateSetting: this.props.updateSetting, value: this.props.settings.elementScaleY, title: "Element Scale Y", id: "elementScaleY", min: "0.01", max: "10", step: ".1" }),
                React.createElement(Slider, { updateSetting: this.props.updateSetting, value: this.props.settings.elementRotation, title: "Element Rotation", id: "elementRotation", min: "0", max: "360", step: ".1" }),
                React.createElement(Slider, { updateSetting: this.props.updateSetting, value: this.props.settings.gridSkew, title: "Grid Skew", id: "gridSkew", min: "-350", max: "350", step: ".001" }),
                React.createElement(Slider, { updateSetting: this.props.updateSetting, value: this.props.settings.cellHeight, title: "Cell Height", id: "cellHeight", min: "5", max: "150", step: ".001" }),
                React.createElement(Slider, { updateSetting: this.props.updateSetting, value: this.props.settings.cellWidth, title: "Cell Width", id: "cellWidth", min: "5", max: "150", step: ".001" }),
                React.createElement(Slider, { updateSetting: this.props.updateSetting, value: this.props.settings.spacing, title: "Spacing", id: "spacing", min: "-150", max: "150", step: ".001" })
            );
        }
    }]);

    return Settings;
}(React.Component);

var App = function (_React$Component7) {
    _inherits(App, _React$Component7);

    function App(props) {
        var _settings;

        _classCallCheck(this, App);

        var _this7 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this7.state = {
            width: 0,
            height: 0,
            editModeEnabled: false,
            settings: (_settings = {
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
                cellHeight: 40
            }, _defineProperty(_settings, "smoothing", 10), _defineProperty(_settings, "spacing", 17), _defineProperty(_settings, "text", "Space"), _settings)

        };
        _this7.updateSetting = _this7.updateSetting.bind(_this7);
        _this7.updateWindowDimensions = _this7.updateWindowDimensions.bind(_this7);

        window.addEventListener('resize', _this7.updateWindowDimensions);
        return _this7;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.updateWindowDimensions();
        }
    }, {
        key: "updateWindowDimensions",
        value: function updateWindowDimensions() {
            this.setState({ width: window.innerWidth, height: window.innerHeight });
        }
    }, {
        key: "updateSetting",
        value: function updateSetting(setting, value) {
            this.setState(function (prevState) {
                if (prevState.settings[setting] !== null) {
                    prevState.settings[setting] = value;
                } else {
                    console.error("Attempted to update non-existing setting " + setting);
                }
                return prevState;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            var letters = this.state.settings.text.toLowerCase().split('');
            var gridWidth = this.state.settings.gridColumns * this.state.settings.cellWidth + defaultSize * this.state.settings.elementScaleX + this.state.settings.spacing;
            var gridHeight = this.state.settings.gridRows * this.state.settings.cellHeight;
            var baseX = this.state.width / 2 - gridWidth / 2 * letters.length;
            var baseY = this.state.height / 2 - gridHeight / 2;

            var glyphs = letters.map(function (g, i) {
                if (design.grids[_this8.state.settings.gridID].letters[g]) {
                    currentX = baseX + gridWidth * i;
                    return React.createElement(Glyph, { key: "glyph-" + i, settings: _this8.state.settings, g: g, y: baseY, x: currentX });
                }
            });

            var containerWidth = (this.state.settings.gridColumns - 1) * this.state.settings.cellWidth + Math.abs(this.state.settings.gridSkew) + defaultSize * this.state.settings.elementScaleX * 4;
            var containerHeight = this.state.settings.gridRows * this.state.settings.cellHeight + defaultSize * this.state.settings.elementScaleY * 2;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "svg",
                    { className: "testPreview", width: this.state.width, height: this.state.height },
                    glyphs
                ),
                React.createElement(Settings, { updateSetting: this.updateSetting, settings: this.state.settings })
            );
        }
    }]);

    return App;
}(React.Component);

function initMax() {
    // Let's throw a react app into this mix
    var domContainer = document.querySelector('.max-container');
    ReactDOM.render(React.createElement(App, null), domContainer);
}

maxStartEl.addEventListener("click", function (e) {
    e.stopPropagation();
    maxContainer.classList.add('active');
});
initMax();

maxContainer.addEventListener('click', function (e) {
    if (e.clientX > window.innerWidth / 2) {
        maxContainer.classList.remove('active');
    }
});