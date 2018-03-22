import React from 'react';

import Sms from '../pagedraw/convlist';

const smslist = [
    {lastName: 'Akande', firstName: 'Tadiwa', text: 'This a meaningful text looking for its own raison d\'être.', dateSince: '3mn ago'},
    {lastName: 'Adotebayo', firstName: 'Tom', text: 'This a meaningful text looking for its own raison d\'être.', dateSince: '14mn ago'},
];

export default () => (
    <Sms list={smslist} />
)