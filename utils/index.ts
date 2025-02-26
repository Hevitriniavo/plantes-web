export function wait(duration: number = 1) {
    return new Promise(resolve => setTimeout(resolve, duration * 1000));
}

export function formateId(id: number) {
    return `#${String(id).padStart(4, '0')}`; 
}


export function truncate (text: string, maxLength: number = 10): string  {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
