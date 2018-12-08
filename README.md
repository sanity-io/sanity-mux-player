# Sanity Mux Video Player

Play videos from MUX.com integrated with the Sanity plugin [`sanity-plugin-mux-input`](https://github.com/sanity-io/sanity-plugin-mux-input)

# Using

- First you need to have a `mux.videoAsset` asset document in your hand. These documents are referenced to in the type `mux.video` that you will use inside your own types.

- Then use the player like so:

```
  <SanityMuxPlayer
    assetDocument={assetDocument}
    autoload={true|false}
    autoplay={true|false}
    className={string}
    height={number|percent}
    loop={true|false}
    muted={true|false}
    showControls={true|false}
    style={{}}
    width={number|percent}
  />
```

# Codebox example

Run the test app on [Codesandbox](https://codesandbox.io/s/github/sanity-io/sanity-mux-player/tree/master/test-app)
