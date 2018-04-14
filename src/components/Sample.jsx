import React from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils'
import {saveAs} from 'file-saver'
import image1 from '../images/image1.jpg'
import image2 from '../images/image2.jpg'
import image3 from '../images/image3.jpg'
import image4 from '../images/image4.jpg'
import image5 from '../images/image5.jpg'
import image6 from '../images/image6.jpg'

var zip = new JSZip();
var count = 0;
var zipFilename = "zipFilename.zip";

const photos = [
  {
    name: 'image1.jpg',
    src: image1,
    width: 4,
    height: 3
  },
  {
    name: 'image2.jpg',
    src: image2,
    width: 4,
    height: 3
  },
  {
    name: 'image3.jpg',
    src: image3,
    width: 4,
    height: 3
  },
  {
    name: 'image4.jpg',
    src: image4,
    width: 4,
    height: 3
  },
  {
    name: 'image5.jpg',
    src: image5,
    width: 4,
    height: 3
  },
  {
    name: 'image6.jpg',
    src: image6,
    width: 4,
    height: 3
  }
];

class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: photos, selectAll: false };
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.download = this.download.bind(this);
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
}

export default Sample;
