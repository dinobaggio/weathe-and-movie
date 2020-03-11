import { MasterLayout } from '../components';
import { useRouter } from 'next/router';
// import axios from 'axios';

let Post = function (props) {
    const router = useRouter();
    return (
        <MasterLayout>
            <h1>{router.query.title}</h1>
            <p>This is blog content.</p>
        </MasterLayout>
    )
};

export default Post;