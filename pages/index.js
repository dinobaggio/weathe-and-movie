import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MasterLayout } from '../components';


const IndexComponent = function (props) {
    return (
        <MasterLayout>
            {/* some code */}
            <h5 className="text-center">Welcome. In this application has two applications, the first one is Show Movie and the second is Weather</h5>
        </MasterLayout>
    )
}

export default IndexComponent