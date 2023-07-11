import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="theme-color" content="#008CFF"></meta>
                    <meta property="og:title" content="lechsbott page"></meta>
                    <meta property="og:image" content="https://lechsbott.netlify.app/favicon.ico"></meta>
                </Head>
                <NextScript />
                <body>
                    <Main />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
