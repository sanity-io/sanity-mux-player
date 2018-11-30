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
    showControls={true|false}
    style={{}}
    className={string}
    width={number|percent}
    height={number|percent}
  />
```

# Codebox example

We have made an example here: https://codesandbox.io/s/814v6j934j
