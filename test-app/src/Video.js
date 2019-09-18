/* eslint-disable camelcase */

import React, {Component} from 'react'
import SanityMuxPlayer from './player'

// Just for test. You would get the asset document from the client in real life.
const assetDocument = {
  _id: 'a6e70715-ec6f-4fe1-8b5b-7d6aeb74759c',
  _rev: '0xLJdqcI4pgly0b1Ixu67q',
  _type: 'mux.videoAsset',
  data: {
    aspect_ratio: '16:9',
    created_at: '1543532219',
    duration: 170.859,
    id: 'KNlhusaO201gm3vrD00LLHaRO02DW9RBPjF',
    max_stored_frame_rate: 25,
    max_stored_resolution: 'HD',
    mp4_support: 'none',
    passthrough: 'a6e70715-ec6f-4fe1-8b5b-7d6aeb74759c',
    playback_ids: [{id: 'oxWh34cgT802eHzHIhPXWoHsZb9htpkZL', policy: 'public'}],
    status: 'ready',
    tracks: [
      {
        duration: 170.84,
        id: 'ZYxBhbZy8hnmcNaXWDDeRC302zO01LbLv3',
        max_frame_rate: 25,
        max_height: 720,
        max_width: 1280,
        type: 'video'
      },
      {
        duration: 170.858667,
        id: 'ZCavEVHaoxjI02RWMBRBuviQLnTxIu2NGk2M4mDGn9Mo',
        max_channel_layout: '5.1',
        max_channels: 6,
        type: 'audio'
      }
    ]
  },
  filename: 'SampleVideo_1280x720_30mb.mp4',
  playbackId: 'sRXwrKHnIO2WJ8GZNRlHY00oxAbI2f2W6',
  status: 'ready',
  thumbTime: 13.736837
}

class Video extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <SanityMuxPlayer
        assetDocument={assetDocument}
        autoload={true}
        autoplay={false}
        showControls={true}
        muted={false}
        loop={false}
      />
    )
  }
}

export default Video
