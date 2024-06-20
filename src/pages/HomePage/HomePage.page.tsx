import useCrud from '@/utils/helpers/apiCrud';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { get, post, put, del, loading, error } = useCrud();
    const [data, setData] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await get('/posts');
                setData(result);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    });

    const handleCreate = async () => {
        try {
            const newData = {
                /* your data here */
                title: 'foo',
                body: 'bar',
                userId: 1,
            };
            const result = await post('/posts', newData);
            setData((prevData) => [...prevData, result]);
        } catch (error) {
            console.error('Error creating data', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedData = {
                /* your updated data here */
                id: 1,
                title: 'foo1',
                body: 'bar',
                userId: 1,
            };
            const result = await put('/posts/1', updatedData);
            setData((prevData) => prevData.map((item) => (item.id === result.id ? result : item)));
        } catch (error) {
            console.error('Error updating data', error);
        }
    };

    const handleDelete = async () => {
        try {
            await del('/posts/1');
            setData([]); // Or update state as needed
        } catch (error) {
            console.error('Error deleting data', error);
        }
    };

    return (
        <div>
            <button onClick={handleCreate}>{t('BUTTONS.CREATE')}</button>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
            <div>Total Items : {data.length}</div>
            {loading
                ? 'Loading...'
                : data
                  ? data?.map((item: { id: number; userId: number; title: string; body: string }) => {
                        return (
                            <div key={item.id}>
                                <p>
                                    {item.id} {item.title}
                                </p>
                                <p>{item.body}</p>
                            </div>
                        );
                    })
                  : 'No data'}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default HomePage;
