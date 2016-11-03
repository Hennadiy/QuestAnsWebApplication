"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var $ = require('jquery');
var EditUserImage = (function (_super) {
    __extends(EditUserImage, _super);
    function EditUserImage() {
        _super.call(this);
        this.state = {
            imgContent: null,
            imgName: ''
        };
        this.onChange = this.onChange.bind(this);
        this.openImagePicker = this.openImagePicker.bind(this);
    }
    EditUserImage.prototype.onChange = function (event) {
        if (event.target.files.length > 0) {
            this.setState({ imgName: event.target.files[0].name });
            var reader = new FileReader();
            reader.onload = function (e) {
                this.setState({ imgContent: e.target.result });
            }.bind(this);
            reader.readAsDataURL(event.target.files[0]);
            var secondReader = new FileReader();
            secondReader.onload = function (e) {
                this.props.onChange({
                    Name: this.state.imgName,
                    Content: new Uint8Array(e.target.result)
                });
            }.bind(this);
            secondReader.readAsArrayBuffer(event.target.files[0]);
        }
    };
    EditUserImage.prototype.openImagePicker = function () {
        $("#imagePicker").click();
    };
    EditUserImage.prototype.render = function () {
        var content = (<span></span>);
        if (this.state.imgContent) {
            content = (<img src={this.state.imgContent} className="editUserImage"/>);
        }
        else if (this.props.url) {
            content = (<img src={this.props.url} className="editUserImage"/>);
        }
        return (<div className="editImageContainer">
                <label>Image</label>
                <div>
                    <span className="imagePickerContainer">
                        <input type="text" className="imagePicker form-control" value={this.state.imgName} readOnly={true}/>
                        <span className="imagePickerIcon" onClick={this.openImagePicker}></span>
                    </span>
                    <input type="file" accept="image/*" name={this.props.name} id="imagePicker" className="imagePickerHidden" onChange={this.onChange}/>
                </div>
                <div className="editUserImageContainer">
                    {content}
                </div>
            </div>);
    };
    return EditUserImage;
}(React.Component));
exports.EditUserImage = EditUserImage;
