
import React, { useState } from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { Fragment } from 'react'
import NProgress from 'nprogress'
import { Row, Col, Container } from 'reactstrap'
import { NavigationHead } from '.'
// import 'bootstrap/dist/css/bootstrap.css'

// Router.events.on('routeChangeStart', url => {
//     return 'Loading ...'
// })

const styleLayout = {
    marginTop: '2rem',
    minHeight: '650px'
}

export default function (props) {
    const [loading, setLoading] = useState(false);

    return (
        <Fragment>
            <Head>
                <link
                    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    rel="stylesheet"
                    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                    crossorigin="anonymous"
                />
            </Head>

            <div className="header--menu">
                <NavigationHead
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>

            <Container style={styleLayout}>
                <Row>
                    <Col lg="2" md="2">
                        {(() => {
                            let el = [];
                            for (let i = 0; i < 18; i++) {
                                el.push(i)
                            }
                            return el.map((item, index) => (
                                <Fragment key={`blackwhite--${index}-${item}`}>
                                    <div className="black"></div>
                                    <div className="white" ></div>
                                </Fragment>
                            ))
                        })()}
                    </Col>
                    <Col lg="10" md="10">
                        {(() => {
                            if (loading) {
                                return <div className="text-center"><i className="fa fa-spin fa-spinner" /></div>
                            }
                            return props.children
                        })()}
                    </Col>
                </Row>
            </Container>

            <footer>

            </footer>

            <style jsx>{`
                footer {
                    height: 120px;
                    background-color: #00000008;
                    margin-top: 2rem;
                    border-top: 1px solid #eaeaea;
                }

                :global(.no--result) {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }

                .header--menu {
                    border-bottom: 1px solid #eaeaea;
                    height: 75px;
                    display: flex;
                    align-items: center;
                    // justify-content: center;
                }
                .navigator {
                    width: 100%;
                    margin: 0 auto;
                    padding: 0 1rem;
                    maxWidth: 1024px;
                    flex: 1;
                }
                .black {
                    background-color: black;
                    height: 20px;
                }
                .white {
                    background-color: white;
                    height: 20px;
                }
                :global(a) {
                    text-decoration: none!important;
                    color: black;
                }
                :global(.card-header) {
                    background-color: unset;
                } 
            `}</style>
        </Fragment>
    )
}
