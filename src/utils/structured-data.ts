import {Thing, WithContext} from 'schema-dts';

export const setStructuredData = (data: WithContext<Thing>) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(data);
    document.head.appendChild(script);
};
