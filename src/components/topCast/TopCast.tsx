import LazyLoadImg from "../lazyLoadImg/LazyLoadImg";
import styles from "./TopCast.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import avtar from "../../assets/avatar.png";
import { CastCrew } from "../../constants/TypeGuards";

interface Cast {
    imgBaseURL: string,
    data: CastCrew[]
}


const TopCast = ({ imgBaseURL, data }: Cast) => {


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1440 },
            items: 6,
            slidesToSlide: 6
        },
        largeDesktop: {
            breakpoint: { max: 1440, min: 1170 },
            items: 6,
            slidesToSlide: 6
        },
        desktop: {
            breakpoint: { max: 1170, min: 850 },
            items: 5,
            slidesToSlide: 5
        },
        tablet: {
            breakpoint: { max: 850, min: 660 },
            items: 4,
            slidesToSlide: 4
        },
        mobile: {
            breakpoint: { max: 660, min: 0 },
            items: 3,
            slidesToSlide: 3
        }
    };
    
    if(!data){
        return null;
    }


    return (
        <div className={styles.topCastContainer}>
            <header>
                <h2>Top Cast</h2>
            </header>

            <Carousel
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >

                {
                    data.slice(0, 10).map(cast => {
                        const img = cast.profile_path ? imgBaseURL + cast.profile_path : avtar;

                        return <div className={styles.cast} key={cast.id}>
                            <div className={styles.profilePic}>
                                <LazyLoadImg src={img} className="" />
                            </div>
                            <p className={styles.realName}>{cast.name}</p>
                            <p className={styles.reelName}>{cast.character}</p>
                        </div>
                    })
                }




            </Carousel>
        </div>
    )
}

export default TopCast