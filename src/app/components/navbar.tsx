'use client'

import styles from '../page.module.css'
import {Avatar, Button, FluentProvider, Image, LargeTitle, Text, Title1, Title2, teamsLightTheme} from '@fluentui/react-components'

const Navbar = () => {
    return (
        <>
        <FluentProvider theme={teamsLightTheme}>
            <div className={styles.flexcontainer} style={{width: '100%', height: '64px', flexFlow: 'row', justifyContent: 'space-between'}}>
                <div>
                    <div className={styles.flexcontainer} style={{marginLeft: '8px', flexFlow: 'row', height: '48px'}}>
                        <div className={styles.flexitemmargin} style={{height: '48px'}}>
                            <Image
                                src='/logo.png'
                                alt='Restart Logo'
                                fit='contain'
                            ></Image>
                        </div>
                        <div className={styles.flexitemmargin}><Title2>Restart.</Title2></div>
                    </div>
                </div>
                <div>
                    <Avatar
                        name='Flip Trail'
                        color='colorful'
                        size={36}
                    ></Avatar>
                </div>
            </div>
        </FluentProvider>
        </>
    )
}

export {Navbar}