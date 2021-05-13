# Sanity Mux Video Player

> Play videos from MUX.com integrated with the Sanity plugin [`sanity-plugin-mux-input`](https://github.com/sanity-io/sanity-plugin-mux-input)

## Install
```
yarn add sanity-mux-player
```

## Usage

### In a React application

- First you need to have a `mux.videoAsset` asset document in your hand. These documents are referenced to in the type `mux.video` that you will use inside your own types.

- Then use the player like so:

```js
<SanityMuxPlayer
  assetDocument={assetDocument}
  autoload={true | false}
  autoplay={true | false}
  className={string}
  height={number | percent}
  loop={true | false}
  muted={true | false}
  showControls={true | false}
  style={{}}
  width={number | percent}
  poster={boolean | string} // defaults to true, an URL can be provided to override the Mux asset thumbnail
/>
```
_Autoplaying videos: Videos must be muted to start playing automatically. In Safari, the additional `playsinline` attribute is [required](https://webkit.org/blog/6784/new-video-policies-for-ios/) and must be added [programmatically](https://github.com/sanity-io/sanity-mux-player/issues/2)._

#### Codebox example

Run the test app on [Codesandbox](https://codesandbox.io/s/github/sanity-io/sanity-mux-player/tree/main/test-app)


### In the Rich Text Editor
You can embed the player in the Rich Text Editor. First add the `mux.video` type provided by `sanity-plugin-mux-input`, then import`sanity-mux-player` and use it as a preview component. For more information, you can follow the [video](https://www.youtube.com/watch?v=cy9fgZa8d90&) or [written](https://www.sanity.io/guides/how-to-embed-an-instagram-post-in-portable-text) tutorial from Sanity about embedding Instagram posts; the logic stays the same for embedding Mux videos.

```js
// schemas/documents/post.js
import React from 'react'
import SanityMuxPlayer from 'sanity-mux-player'

export default {
  type: "document",
  title: "Blog post",
  name: "post",
  fields: [
    {
      type: "string",
      name: "title"
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [
      { type: "block" }, 
      {
        title: 'Video',
        name: 'video',
        type: 'mux.video',
        preview: {
          component: SanityMuxPlayer,
          }
      }]
    }
  ]
}
```

