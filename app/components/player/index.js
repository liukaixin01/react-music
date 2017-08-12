import React, {Component} from 'react';
import ProgressBar from '../progressBar'
import './index.less'

export default class Player extends Component {
  constructor() {
    super()
    this.onChangeProgressHandle = this.onChangeProgressHandle.bind(this)
    this.onChangeVolumeHandle = this.onChangeVolumeHandle.bind(this)
    this.playFlag = this.playFlag.bind(this)
    this.state = {
      progress: 0,
      volume: 0,
      backColor: '#2f9842',
      volumeBackColor: 'red',
      duraction: null,
      isPlay: true
    }
  }
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, _ => {
      this.setState({
        duration: _.jPlayer.status.duration,
        progress: Math.round(_.jPlayer.status.currentPercentAbsolute),
        volume: _.jPlayer.options.volume * 100
      })
    })
  }
  componentWillUnMount() {
    $('#player').bind($.jPlayer.event.timeupdate)
  }
  onChangeProgressHandle(progress) {
    $('#player').jPlayer('play', this.state.duration * progress)
  }
  onChangeVolumeHandle(progress) {
    $('#player').jPlayer('volume', progress)
  }
  playFlag() {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  render() {
    const {
      progress,
      volume,
      backColor,
      volumeBackColor,
    } = this.state
    const {
      currentMusicItem: {
        title,
        artist,
        cover
      }
    } = this.props
    return (
      <div className="player-page">
               <h1 className="caption">
               我的私人音乐坊 &gt;</h1>
               <div className="mt20 row">
                 <div className="controll-wrapper">
                   <h2 className="music-title">{title}</h2>
                   <h3 className="music-artist mt10">{artist}</h3>
                   <div className="row mt20">
                     <div className="left-time -col-auto">-2:00</div>
                     <div className="volume-container">
                       <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                       <div className="volume-wrapper">
                         <ProgressBar
                           progress={volume}
                           backColor={volumeBackColor}
                           onChangeProgress={this.onChangeVolumeHandle}
                         />
                       </div>
                     </div>
                   </div>
                   <div style={{height: 10, lineHeight: '10px'}}>
                     <ProgressBar
                       progress={progress}
                       backColor={backColor}
                       onChangeProgress={this.onChangeProgressHandle}
                     />
                   </div>
                   <div className="mt35 row">
                     <div>
                       <i className="icon prev" onClick={this.prev}></i>
                       <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.playFlag}></i>
                       <i className="icon next ml20" onClick={this.next}></i>
                     </div>
                     <div className="-col-auto">
                       <i className='icon repeat-cycle' onClick={this.changeRepeat}></i>
                     </div>
                   </div>
                 </div>
                 <div className="-col-auto cover">
                   <img src={cover} alt={title} />
                 </div>
               </div>
           </div>
    )
  }
}
