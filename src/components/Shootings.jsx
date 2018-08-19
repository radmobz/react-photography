
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import GalleryPerso from './GalleryPerso'
import EXIF from 'exif-js'


export default class Shootings extends Component {
    constructor(props) {
        super(props);
        this.state = { naissances: [], grossesses: [], enfants: [], mariage: [] }
    }

    componentWillMount() {
        this.getPictures('ENFANTS')
        this.getPictures('MARIAGE')
        this.getPictures('GROSSESSE')
        this.getPictures('NAISSANCE')
    }

    getPictures = (type) => {
        const url = 'https://ged-api.herokuapp.com/v1/documents/vitrine?type=' + type
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {

                let photos = []
                console.log(json)

                json.map(photo => {

                    if (photo.erreur !== undefined) {
                        this.setState({ openedErrorDialog: true, errorMessage: values.values.erreur.value })
                    }
                    else {

                        let binaryString = atob(photo.base64);
                        let len = binaryString.length;
                        let bytes = new Uint8Array(len);
                        for (var i = 0; i < len; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                        

                        var exif = EXIF.readFromBinaryFile(bytes.buffer);
                        const orientation = exif.Orientation ? exif.Orientation : 0
                        //alert(exif.Orientation);

                        const photoToAdd = {
                            id: photo.id,
                            path: photo.path,
                            name: photo.name,
                            src: 'https://ged-api.herokuapp.com/v1/documents/' + photo.id.split(';')[0],
                            thumbnail: 'https://ged-api.herokuapp.com/v1/documents/thumb/' + photo.id.split(';')[0],
                        }
                        photos.push(photoToAdd)
                    }
                })


                switch (type) {
                    case 'ENFANTS':
                        this.setState({ enfants: photos })
                        break
                    case 'MARIAGE':
                        this.setState({ mariage: photos })
                        break
                    case 'GROSSESSE':
                        this.setState({ grossesses: photos })
                        break
                    case 'NAISSANCE':
                        this.setState({ naissances: photos })
                        break
                }

            })
            .catch(function (error) {
                console.log(error)
                this.setState({ openedErrorDialog: true, errorMessage: 'erreur' })
            })
    }

    base64ToArrayBuffer = (base64) => {

    }

    render() {
        return (
            <div>
                <section id="mariage" className="light-wrapper">
                    <div className="container inner">
                        <h3 className="section-title text-center">Mariages</h3>
                        <p className="text-center">Quelques exemples de photos prises lors de mariages</p>
                        {
                            this.state.mariage.length > 0 ?
                                <div>
                                    <GalleryPerso
                                        images={this.state.mariage}
                                    />
                                </div>
                                :
                                <div>
                                    <div className="divide20"></div>
                                    <div className="cbp-panel">
                                        <div className="cbp cbp-onepage-grid">
                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf1-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf1.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf2-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf2.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf3-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf3.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf4-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf4.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf5-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf5.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf6-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf6.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a></div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </section>

                <section id="grossesse" className="dark-wrapper">
                    <div className="container inner">
                        <h3 className="section-title text-center">Grossesse</h3>
                        <p className="text-center">Voici quelques photos de mes derniers Shootings Grossesse.</p>
                        {
                            this.state.grossesses.length > 0 ?
                                <div>
                                    <GalleryPerso
                                        images={this.state.grossesses}
                                    />
                                </div>
                                :
                                <div>
                                    <div className="divide20"></div>
                                    <div className="cbp-panel">
                                        <div className="cbp cbp-onepage-grid">
                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf7-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf7.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf8-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf8.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf9-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf9.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf10-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf10.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf11-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf11.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf12-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf12.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf13-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf13.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf14-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf14.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf15-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf15.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </section>

                <section id="naissance" className="light-wrapper">
                    <div className="container inner">
                        <h3 className="section-title text-center">Naissance</h3>
                        <p className="text-center">Petits exemples de photos prises lors de naissances.</p>
                        {
                            this.state.naissances.length > 0 ?
                                <div>
                                    <GalleryPerso
                                        images={this.state.naissances}
                                    />
                                </div>
                                :
                                <div>
                                    <div className="divide20"></div>
                                    <div className="cbp-panel">
                                        <div className="cbp cbp-onepage-grid">

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf16-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf16.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf17-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf17.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf18-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf18.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf19-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf19.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf20-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf20.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="style/images/art/pf21-full.jpg">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf21.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </section>

                <section id="enfants" className="dark-wrapper">
                    <div className="container inner">
                        <h3 className="section-title text-center">Enfants / Famille</h3>
                        <p className="text-center">Exemples de photos prises lors de mes derniers Shootings pour les enfants, la famille, etc.</p>
                        {
                            this.state.enfants.length > 0 ?
                                <div>
                                    <GalleryPerso
                                        images={this.state.enfants}
                                    />
                                </div>
                                :
                                <div>
                                    <div className="divide20"></div>
                                    <div className="cbp-panel">
                                        <div className="cbp cbp-onepage-grid">

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="https://vimeo.com/25518056">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf22.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="https://vimeo.com/24030911">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf23.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="https://vimeo.com/22589529">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf24.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="https://vimeo.com/6757600">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf25.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>
                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="https://vimeo.com/24243147">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf26.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>

                                            <div className="cbp-item"> <a className="cbp-caption fancybox-media" data-rel="portfolio" href="https://vimeo.com/24573328">
                                                <div className="cbp-caption-defaultWrap"> <img src="style/images/art/pf27.jpg" alt="" /> </div>
                                                <div className="cbp-caption-activeWrap">
                                                    <div className="cbp-l-caption-alignCenter">
                                                        <div className="cbp-l-caption-body">
                                                            <div className="cbp-l-caption-title"><span className="cbp-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a> </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </section>
            </div>
        );
    }
}


