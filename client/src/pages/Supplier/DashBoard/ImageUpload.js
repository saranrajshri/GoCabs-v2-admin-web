import React from "react";

// Bootstrap Components
import { Row, Col, Button } from "react-bootstrap";

// StyleSheet
import "./ImageUpload.css";

// Firestorage
import { storage } from "../../../firebase/firebase";

// Context
import FireBaseContext from "../../../context/firebaseContext";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "", loading: false };
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const uploadTask = storage
      .ref(`images/${this.state.file.name}`)
      .put(this.state.file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(this.state.file.name)
          .getDownloadURL()
          .then(url => {
            // console.log(url);
            this.context.setTempFirestorageImageURL(url);
            this.props.postProduct();
            this.context.sleep(1000);
            this.setState({
              loading: false
            });
          });
      }
    );
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} className="w-50 border-border-muted mt-3" />
      );
    }

    return (
      <div className="previewComponent mt-4">
        <h5>Upload Images</h5>
        <form onSubmit={e => this._handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
        </form>
        <div className="imgPreview">{$imagePreview}</div>
        <Row className="mt-4">
          <Col className="d-flex justify-content-end">
            <Button
              variant="primary"
              className={this.state.loading ? "disabled" : null}
              type="submit"
              onClick={e => this._handleSubmit(e)}
            >
              {this.state.loading ? "Uploading.." : "Post"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
ImageUpload.contextType = FireBaseContext;
export default ImageUpload;
