import React from "react";
import PropTypes from "prop-types";
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
import DownloadIcon from '@material-ui/icons/CloudDownload'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

var zip = new JSZip();
var count = 0;
var zipFilename = "zipFilename.zip";

const photos = [
];

class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: [], photos: photos, selectAll: false, password: '', clientId: '', openedDialog: true, errorMessage: '', openedErrorDialog: false, value: 0, };
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.download = this.download.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeClienId = this.handleChangeClienId.bind(this)
  }

  handleChange = (event, value) => {
    console.log(value)
    this.unselectAll()
    this.setState({ value });

    if (this.state.photos[value] === undefined) {
      this.getPictures(value)
    }

  };

  getPictures = (albumId) => {

    const values = {
      clientId: this.state.clientId,
      password: this.state.password,
      albumId: this.state.albums[albumId]
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

        let photos = []
        let photosState = this.state.photos
        console.log(json)

        json.map(photo => {

          if (photo.erreur !== undefined) {
            this.setState({ openedErrorDialog: true, errorMessage: values.values.erreur.value })
          }
          else {
            const photoToAdd = {
              id: photo.id,
              path: photo.path,
              name: photo.name,
              src: 'https://ged-api.herokuapp.com/v1/documents/' + photo.id.split(';')[0],
              width: 4,
              height: 3
            }
            photos.push(photoToAdd)
          }
        })



        console.log(photos)
        photosState.push(photos)
        console.log(photosState)
        //photos[0].src = 'data:image/png;base64, ' + json.values.base64.value
        this.setState({ photos: photosState })

      })
      .catch(function (error) {
        console.log(error)
        //this.setState({ openedErrorDialog: true, errorMessage: 'erreur' })
      })
  }

  getShootings = () => {

    const values = {
      clientId: this.state.clientId,
      password: this.state.password
    }

    const url = 'https://ged-api.herokuapp.com/v1/documents/folders'
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

        let albums = this.state.albums

        console.log(json)

        json.map(album => {
          albums.push(album)
        })

        console.log(albums)

        //photos[0].src = 'data:image/png;base64, ' + json.values.base64.value
        this.setState({ albums: albums })

        if (this.state.photos.length === 0)
          this.getPictures(0)

      })
      .catch(function (error) {
        console.log(error)
        this.setState({ openedErrorDialog: true, errorMessage: 'erreur' })
      })
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  };

  handleChangeClienId(event) {
    this.setState({
      clientId: event.target.value,
    });
  };

  handleSave() {
    if (this.state.password.length > 0) {
      this.setState({ openedDialog: false })
      //this.getPictures()
      this.getShootings()
    }
  }

  handleCloseError = () => {
    this.setState({ openedErrorDialog: false, errorMessage: '', openedDialog: true, clientId: '', password: '' })
  }

  handleCloseIdentification = () => {
    this.props.history.push("/");
  }

  selectPhoto(event, obj) {
    let photosState = this.state.photos;
    let photos = photosState[this.state.value]
    photos[obj.index].selected = !photos[obj.index].selected;
    photosState[this.state.value] = photos
    this.setState({ photos: photosState });
  }

  unselectAll = () => {
    let photosState = this.state.photos
    let photos = this.state.photos[this.state.value]
    photos = photos.map((photo, index) => {
      return { ...photo, selected: false };
    });
    photosState[this.state.value] = photos
    this.setState({ photos: photosState, selectAll: !this.state.selectAll });
  }

  toggleSelect() {
    let photosState = this.state.photos
    let photos = this.state.photos[this.state.value]
    photos = photos.map((photo, index) => {
      return { ...photo, selected: !this.state.selectAll };
    });
    photosState[this.state.value] = photos
    this.setState({ photos: photosState, selectAll: !this.state.selectAll });
  }
  download(e) {
    let filesToDownload = [];
    this.state.photos[this.state.value].map(photo => {
      if (photo.selected === true) {
        filesToDownload.push({
          name: photo.name,
          path: photo.path,
          id: photo.id
        })
      }
    })

    const request = {
      clientId: this.state.clientId,
      password: this.state.password,
      albumId: this.state.albums[this.state.value],
      photos: filesToDownload
    }

    console.log(request)

    const url = 'https://ged-api.herokuapp.com/v1/documents/ask'
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
      .then(response => response.json())
      .then(json => {

        
        console.log(json)


      })
      .catch(function (error) {
        console.log(error)
        this.setState({ openedErrorDialog: true, errorMessage: 'erreur' })
      })

    this.unselectAll()

    /*filesToDownload.forEach(function (photoToZip) {
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
    });*/

  }
  render() {
    const { value } = this.state;

    if (this.state.albums.length > 0 && this.state.password.length > 0) {
      return (
        <div>
          <Tabs value={value} onChange={this.handleChange}>
            {
              this.state.albums.map(album => {
                return (<Tab label={album} key={album} />)
              })
            }
          </Tabs>
          {
            
            <div>
              Album du {this.state.albums[value]}
              {
                this.state.photos[value] !== undefined && this.state.photos[value].length > 0 ? 
              <div>
              <Gallery
                photos={this.state.photos[value]}
                onClick={this.selectPhoto}
                ImageComponent={SelectedImage}
              />
              <p>
                <IconButton color="primary" onClick={this.toggleSelect} aria-label="Select ALL">
                  <DoneAllIcon />
                </IconButton>
                <IconButton color="primary" onClick={this.download} aria-label="Download">
                  <DownloadIcon />
                </IconButton>

              </p>
              </div>
              :
              <div>Photos en cours de chargement </div>
              }
            </div>
          }

        </div>
      )
    }

    if (this.state.photos.length > 0 && this.state.password.length > 0) {
      return (
        <div>

          <Gallery
            photos={this.state.photos}
            onClick={this.selectPhoto}
            ImageComponent={SelectedImage}
          />
          <p>
            <IconButton color="primary" onClick={this.toggleSelect} aria-label="Select ALL">
              <DoneAllIcon />
            </IconButton>
            <IconButton color="primary" onClick={this.download} aria-label="Download">
              <DownloadIcon />
            </IconButton>

          </p>
        </div>
      );
    }
    else if (this.state.errorMessage.length > 0) {
      return (<div>
        <Dialog
          open={this.state.openedErrorDialog}
          onBackdropClick={this.handleCloseError}
          onEscapeKeyDown={this.handleCloseError}
          keepMounted
        >
          <DialogTitle>
            {"Erreur"}
          </DialogTitle>
          <DialogContent>
            Identification impossible !
          </DialogContent>

        </Dialog>

      </div>)
    }
    else {
      return (<div>
        <Dialog
          open={this.state.openedDialog}
          onBackdropClick={this.handleCloseIdentification}
          onEscapeKeyDown={this.handleCloseIdentification}
          keepMounted
        >
          <DialogTitle>
            {"Identification"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="name"
              label="N Client"
              value={this.state.clientId}
              onChange={this.handleChangeClienId}
              margin="normal"
            /> <br />
            <TextField
              id="name"
              label="Mot de passe"
              value={this.state.password}
              onChange={this.handleChangePassword}
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

export default withRouter(Sample);
