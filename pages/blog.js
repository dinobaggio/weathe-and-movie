import { MasterLayout } from '../components';
import Link from 'next/link';

const PostLink = function (props) {
    return (
        <li>
            <Link href={`/p/[id]`} as={`/p/${props.id}`} >
                <a>{props.id}</a>
            </Link>
            <style jsx>{`
            li {
                list-style: none;
                margin: 5px 0;
            }

            a {
                text-decoration: none;
                color: blue;
                font-family: 'Arial';
            }

            a:hover {
                opacity: 0.6;
            }
            `}</style>
        </li>
    )
}

export default function () {
    return (
        <MasterLayout>
            <h1>Ini Blog</h1>
            <ul>
                <PostLink id="hello-nextjs" title="Hello Next.js" />
                <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
                <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
            </ul>
            <style jsx>
            {`
                h1,
                a {
                font-family: 'Arial';
                }

                ul {
                padding: 0;
                }

                li {
                list-style: none;
                margin: 5px 0;
                }

                a {
                text-decoration: none;
                color: blue;
                }

                a:hover {
                opacity: 0.6;
                }
            `} 
            </style>
        </MasterLayout>
    )
}