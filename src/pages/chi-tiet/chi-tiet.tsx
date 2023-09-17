import { StarRating } from '../../components/card/starRating/star-rating'
import bannerImage from '../../assets/imgs/chitet_banner_2.jpg'
import { Button } from 'antd'
import css from './chi-tiet.module.scss'
export default function ChiTiet() {
    return (
        <div className={css['chi-tiet']}>
            <div className={css['chi-tiet__banner']}>
                <div className={css['chi-tiet__banner__container']}>
                    <div className={css['chi-tiet__banner__content']}>
                        <div className={css['chi-tiet__left']}>
                            <h1>
                                LẬP TRÌNH FRONT END
                            </h1>
                            <div className={css['chi-tiet__banner__rating']}>
                                <span>Đánh giá khoá học</span>{' '}
                                <StarRating
                                    totalStars={5}
                                    selectedStars={4}
                                    onRate={() => {}}
                                />
                            </div>
                            <div className={css['chi-tiet__banner__action']}>
                                <Button type='primary' ghost>Đăng kí</Button>
                            </div>
                        </div>
                        <div className={css['chi-tiet__right']}>
                            <img src={bannerImage} alt='...' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={css['chi-tiet__content']}>
                <h3 className={css['chi-tiet__denomination']}>Giới thiệu khoá học (Phần mô tả khoá học)</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odio mollitia, atque doloribus ea, impedit voluptas dicta
                    voluptates tenetur alias omnis hic facere asperiores, at
                    excepturi voluptatem modi eaque. Similique laborum tempore
                    fugiat reiciendis cumque amet recusandae error est earum
                    fugit magni vel ea pariatur facilis voluptatum, perspiciatis
                    adipisci praesentium, nostrum excepturi animi quas facere
                    consequatur nisi exercitationem! Obcaecati magni sunt a?
                    Tenetur ad quod architecto dicta obcaecati, quisquam quaerat
                    nesciunt eaque fugit perferendis sapiente qui voluptates
                    tempora iure similique aliquam! Exercitationem pariatur
                    quisquam rerum aspernatur soluta, modi recusandae nisi
                    assumenda eveniet! Est impedit modi unde totam reiciendis,
                    nesciunt esse expedita in laudantium reprehenderit commodi
                    illum perspiciatis sapiente quos soluta cum! Id architecto
                    ex quam et, placeat natus neque? Labore temporibus
                    perspiciatis explicabo! Nostrum molestias, beatae ipsum
                    ducimus voluptate incidunt obcaecati animi? Excepturi
                    accusamus ipsa autem nesciunt numquam culpa ut id inventore
                    cumque architecto neque rem, eveniet consectetur maxime? Sed
                    architecto magni consequuntur inventore deleniti odit
                    pariatur tempora. Dolorem inventore laboriosam distinctio
                    iure placeat ipsam sunt? Quos doloribus sit iste aut nisi a
                    laboriosam exercitationem! Magnam voluptates ducimus,
                    dignissimos ratione necessitatibus asperiores, sint fugit
                    deleniti eaque deserunt sit. Velit aut quos voluptatum
                    reprehenderit pariatur corporis sit quasi obcaecati
                    molestiae autem quas labore facilis porro deserunt
                    repudiandae, tempora totam veniam dignissimos debitis iste.
                    Ratione eius est et possimus, aliquid deserunt consequatur
                    distinctio. Esse veritatis aperiam accusamus sint,
                    repudiandae dicta molestias quis corporis cum dolore,
                    suscipit vitae unde quas ullam cupiditate itaque pariatur
                    eos iure, possimus perspiciatis modi incidunt doloremque
                    eius et? Hic consequatur asperiores quidem, quos ut
                    accusantium et dolorem eveniet perspiciatis itaque fuga odio
                    voluptates eius maxime, provident blanditiis veniam
                    exercitationem excepturi aliquid perferendis laborum
                    obcaecati facilis cupiditate. Eius, consectetur laboriosam?
                    Officia odio repellendus consequatur fuga quas, voluptates
                    sapiente voluptatibus quae iusto dicta quos commodi
                    accusamus repudiandae, dignissimos voluptas, cumque
                    expedita!
                </p>
            </div>
        </div>
    )
}
