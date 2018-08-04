import React from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


var zip = new JSZip();
var count = 0;
var zipFilename = "zipFilename.zip";

const photos = [
];

class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: photos, selectAll: false, password: '', openedDialog: true };
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.download = this.download.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  getPictures = () => {

    const values = {
      clientId: '0000000001',
      password: this.state.password
    }

    const url = 'https://ged-api.herokuapp.com/v1/documents/search'
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(json => {

        let photos = this.state.photos

        json.values.map(values => {
          const photo = {
            name: values.values.name.value,
            src: 'data:image/png;base64, ' + values.values.base64.value,
            width: 4,
            height: 3
          }
          photos.push(photo)
        })

        console.log(photos)

        //photos[0].src = 'data:image/png;base64, ' + json.values.base64.value
        this.setState({ photos: photos })

      })
      .catch(function (error) {
        console.log('erreur')
      })
  }

  handleChange(event) {
    this.setState({
      password: event.target.value,
    });
  };

  handleSave() {
    if (this.state.password.length > 0) {
      this.setState({ openedDialog: false })
      this.getPictures()
    }
  }

  selectPhoto(event, obj) {
    let photos = this.state.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({ photos: photos });
  }
  toggleSelect() {
    let photos = this.state.photos.map((photo, index) => {
      return { ...photo, selected: !this.state.selectAll };
    });
    this.setState({ photos: photos, selectAll: !this.state.selectAll });
  }
  download(e) {
    let filesToDownload = [];
    this.state.photos.map(photo => {
      if (photo.selected === true) {
        filesToDownload.push(photo)
      }
    })
    filesToDownload.forEach(function (photoToZip) {
      var filename = photoToZip.name;
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(photoToZip.src, function (err, data) {
        if (err) {
          console.log('erreur ' + err)
          throw err; // or handle the error
        }
        console.log(data)
        zip.file(filename, data, { binary: true });
        count++;
        if (count == filesToDownload.length) {
          var zipFile = zip.generateAsync({ type: "blob" }).then(function (content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
          });
        }
      });
    });

  }
  render() {
    if (this.state.photos.length > 0 && this.state.password.length > 0) {
      return (
        <div>
          <p>
            <button className="toggle-select" onClick={this.toggleSelect}>
              Select All
          </button>
          </p>
          <Gallery
            photos={this.state.photos}
            onClick={this.selectPhoto}
            ImageComponent={SelectedImage}
          />
          <p>
            <button className="toggle-select" onClick={this.download}>
              Download
          </button>
          </p>
        </div>
      );
    }
    else {
      return (<div>
        <Dialog
          open={this.state.openedDialog}
          keepMounted
        >
          <DialogTitle>
            {"Mot de passe ?"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="name"
              label="Mot de passe"
              value={this.state.password}
              onChange={this.handleChange}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

      </div>)
    }
  }
}

export default Sample;
