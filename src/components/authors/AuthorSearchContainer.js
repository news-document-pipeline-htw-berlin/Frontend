import React, { useState } from 'react';

import SearchAuthors from './SearchAuthors';
import Author from './Author';

/**
 * Contains a search bar and displays author stats for given search.
 */
export default function AuthorSearchContainer() {
    const [id, setId] = useState('');

    return (
        <div>
            <Author id={id}>
                <SearchAuthors setId={setId} />
            </Author>
        </div>
    );
}
