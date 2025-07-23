import React, {useEffect, useState} from 'react';
import { supabase } from '../../utils/supabaseUtils';

const LoginPage = () => {
    const [us, useUs] = useState();

    const auth = async () => {
        const {data, error} = await supabase.auth.getUser();
        console.log(data, error)
        if (!error && data) {
            useUs(data.user.email);
        }
    }

    useEffect(() => {
        auth();
    }, []);

    return (
        <>
            <h3>Привет! {us}</h3>
            <button onClick={auth}>вкусно</button>
        </>
    )
}

export default LoginPage;