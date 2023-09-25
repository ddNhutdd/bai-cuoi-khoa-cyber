import css from './paging.module.scss'
export default function Paging(props: {
    theme: number
    totalPage: number
    selectedPage: number
    setSelectedPage: (a: number) => void
}) {
    const { selectedPage, totalPage: totalItem, setSelectedPage, theme } = props
    const next = (add: number) => {
        let count = selectedPage + add
        if (count < 1) count = 1
        if (count > totalItem) count = totalItem
        setSelectedPage(count)
    }
    const select = (item: number) => {
        setSelectedPage(item)
    }
    const render = () => {
        const htmlString = []
        // render button '<'
        if (selectedPage === 1) {
            htmlString.push(
                <div
                    key={-1}
                    className={
                        theme === 1
                            ? css['page-button'] + ' ' + css['disable']
                            : css['page-button-2'] + ' ' + css['disable-2']
                    }
                    onClick={() => {
                        next(-1)
                    }}
                >
                    &lt;
                </div>,
            )
        } else {
            htmlString.push(
                <div
                    key={-1}
                    className={
                        theme === 1 ? css['page-button'] : css['page-button-2']
                    }
                    onClick={() => {
                        next(-1)
                    }}
                >
                    &lt;
                </div>,
            )
        }
        //--------------------------
        // render các button ở giữa '<' và '>'
        if (totalItem <= 5) {
            for (let i = 1; i <= totalItem; i++) {
                if (selectedPage === i) {
                    htmlString.push(
                        <div
                            key={i}
                            className={
                                theme === 1
                                    ? css['page-button'] + ' ' + css['active']
                                    : css['page-button-2'] +
                                      ' ' +
                                      css['active-2']
                            }
                            onClick={() => select(i)}
                        >
                            {i}
                        </div>,
                    )
                } else {
                    htmlString.push(
                        <div
                            key={i}
                            className={
                                theme === 1
                                    ? css['page-button']
                                    : css['page-button-2']
                            }
                            onClick={() => select(i)}
                        >
                            {i}
                        </div>,
                    )
                }
            }
        } else {
            // totalItem > 6
            if (selectedPage - 1 <= 2) {
                for (let i = 1; i < selectedPage; i++) {
                    htmlString.push(
                        <div
                            key={i}
                            className={
                                theme === 1
                                    ? css['page-button']
                                    : css['page-button-2']
                            }
                            onClick={() => select(i)}
                        >
                            {i}
                        </div>,
                    )
                }
            } else {
                htmlString.push(
                    <div
                        key={1}
                        className={theme === 1 ? css['page-button'] : css['page-button-2']}
                        onClick={() => select(1)}
                    >
                        {1}
                    </div>,
                )
                htmlString.push(
                    <div
                        key={'...1'}
                        className={theme=== 1 ?  css['page-button'] + ' ' + css['dot'] : css['page-button-2'] + ' ' + css['dot']}
                    >
                        ...
                    </div>,
                )
                htmlString.push(
                    <div
                        key={selectedPage - 1}
                        className={theme===1? css['page-button'] : css['page-button-2']}
                        onClick={() => select(selectedPage - 1)}
                    >
                        {selectedPage - 1}
                    </div>,
                )
            }
            htmlString.push(
                <div
                    key={selectedPage}
                    className={theme === 1 ? css['page-button'] + ' ' + css['active']:  css['page-button-2'] + ' ' + css['active-2']}
                    onClick={() => select(selectedPage)}
                >
                    {selectedPage}
                </div>,
            )
            if (totalItem - selectedPage > 2) {
                htmlString.push(
                    <div
                        key={selectedPage + 1}
                        className={theme ===1 ? css['page-button']:css['page-button-2']}
                        onClick={() => select(selectedPage + 1)}
                    >
                        {selectedPage + 1}
                    </div>,
                )
                htmlString.push(
                    <div
                        key={'...2'}
                        className={ theme===1?  css['page-button'] + ' ' + css['dot']   : css['page-button-2'] + ' ' + css['dot']}
                    >
                        ...
                    </div>,
                )
                htmlString.push(
                    <div
                        key={totalItem}
                        className={  theme===1? css['page-button']: css['page-button-2']}
                        onClick={() => select(totalItem)}
                    >
                        {totalItem}
                    </div>,
                )
            } else {
                for (let i = selectedPage + 1; i <= totalItem; i++) {
                    htmlString.push(
                        <div
                            key={i}
                            className={theme===1?
                              css['page-button']: css['page-button-2']  }
                            onClick={() => select(i)}
                        >
                            {i}
                        </div>,
                    )
                }
            }
        }
        //--------------------------
        // render button '>'
        if (selectedPage === totalItem) {
            htmlString.push(
                <div
                    key={totalItem + 1}
                    className={  theme===1?  css['page-button'] + ' ' + css['disable']   : css['page-button-2'] + ' ' + css['disable-2']}
                    onClick={() => {
                        next(1)
                    }}
                >
                    &gt;
                </div>,
            )
        } else {
            htmlString.push(
                <div
                    key={totalItem + 1}
                    className={  theme===1? css['page-button']  :css['page-button-2']}
                    onClick={() => {
                        next(1)
                    }}
                >
                    &gt;
                </div>,
            )
        }
        return htmlString
    }
    return (
        <>
            <div className={css['page']}>{render()}</div>
        </>
    )
}
