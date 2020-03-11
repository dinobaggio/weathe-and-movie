import { Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import {useRouter} from 'next/router'

const linkStyle = {
    marginRight: 15,
    // display: 'flex'
}

export default function(props) {
    const router = useRouter()
    const handleClick = e => {
        let href = e.target.getAttribute('href')
        e.preventDefault()
        if (router.pathname !== href) {
            props.setLoading(!props.loading)
        }
        router.push(href)
    }

    return (
        <Container>
            <Row style={{ width: '100%' }}>
                <Col className="navigator" lg="4" md="4">
                    <a style={linkStyle} onClick={handleClick} href="/">
                        Home
                    </a>
                </Col>
                <Col className="navigator text-center" lg="4" md="4">
                    <a style={linkStyle} onClick={handleClick} href="/show-movie">
                        Show Movie
                    </a>
                </Col>
                <Col className="navigator text-right" lg="4" md="4">
                    <a style={linkStyle} onClick={handleClick} href="/weather">
                        Weather
                    </a>
                </Col>
            </Row>
        </Container>
    )
}
