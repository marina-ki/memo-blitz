import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/, Head } from "blitz"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        {/* <Head>
          <script
            src="https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js"
            defer
          ></script>
        </Head> */}
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
