import React, { useEffect } from 'react';
import { AdminData } from '../context/adminContext';
import { UserData } from '../context/userContext';

function Admin() {
    const { adminResponse } = AdminData();
    const {user} = UserData()
    console.log("onadmin page", adminResponse);
 //   console.log(adminResponse.response[0])
    
    // useEffect(() => {
    //     console.log("admin");
    //     console.log(adminResponse);
    // }, [adminResponse]);

    return (
        <div className="relative overflow-x-auto">
            <div className='text-black text-3xl'>{`Hello! ${user.name}`}</div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            User Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Prompt
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ChatBot Response
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {adminResponse.response.map((user) => (
                        user.conversation.map((convo) => (
                            <tr key={convo._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.userName}
                                </th>
                                <td className="px-6 py-4">
                                    {convo.question}
                                </td>
                                <td className="px-6 py-4">
                                    {convo.summary}
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;