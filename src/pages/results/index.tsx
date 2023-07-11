import styles from "../../styles/Results.module.scss";
import { GetServerSideProps } from "next";
import dl from 'play-dl';
import { Video } from "../../typings";
import Head from "next/head";

function Results({ video }: { video: Video }) {

    if (!video.details) {
        return (
            <>
                <Head>
                    <title>No video found</title>
                </Head>
                <div className={styles.main}>
                    <div className={styles.no_container}>
                        <div>No video available for query: {video.query}</div>
                        <a href="/" className={styles.no_button}>Want another video?</a>
                    </div>
                </div>
            </>
        );

    } else {
        let bestQuality = video.details.thumbnail!.sort((a, b) => b.width - a.width)
        let sortedVideos = video.formats!
            .sort((a, b) => b.width - a.width)
            .sort((a, b) => b.fps - a.fps)

        console.log(sortedVideos)

        return (
            <>
                <Head>
                    <title>Download | {video.details.title}</title>
                </Head>
                <div className={styles.main}>
                    <img className={styles.background} src={bestQuality[0].url} alt="Background" />
                    <div className={styles.container}>
                        <div className={styles.topSection}>
                            <img className={styles.thumbnail} src={bestQuality[0].url} alt={"Thumbnail"} />
                            <div className={styles.title}>{video.details.title}</div>
                            <a href="/" className={styles.no_button}>Want another video?</a>
                        </div>
                        <div className={styles.bottomSection}>
                            <div className={styles.videos}>
                                <div className={styles.title}>Videos</div>
                                <div className={styles.content}>
                                    {sortedVideos.map((format, index) => {
                                        let name = `${format.qualityLabel} | ${format.mimeType?.split("/")[1].split(";")[0]}`

                                        if (format.mimeType?.startsWith("video")) {
                                            return (
                                                <a className={styles.format} href={format.url} key={index}>{name}</a>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                            <div className={styles.videos}>
                                <div className={styles.title}>Audios</div>
                                <div className={styles.content}>
                                    {video.formats?.map((format, index) => {
                                        let name = `${format.codec} | ${format.container}`

                                        if (format.mimeType?.startsWith("audio")) {
                                            return (
                                                <a className={styles.format} href={format.url} key={index}>{name}</a>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Results;

export const getServerSideProps: GetServerSideProps<any> = async (props) => {
    let link = props.query.search_query as string;

    let video: Video = {
        details: null,
        formats: null,
        query: link
    }

    if (!link) {
        return {
            props: {
                video
            }
        };
    }

    let req = await dl.video_info(link)
        .catch((err) => {
            return null;
        })

    if (req) {
        let details = req.video_details;
        let formats = req.format;

        video.details = {
            title: details.title,
            thumbnail: details.thumbnails
                .sort((a, b) => a.width - b.width)
                .map(x => x.toJSON()),
            channel: details.channel?.toJSON(),
            url: details.url,
            id: details.id,
            durations: {
                raw: details.durationRaw,
                seconds: details.durationInSec
            }
        }
        video.formats = formats as any;
    }

    return {
        props: {
            video
        }
    };
};