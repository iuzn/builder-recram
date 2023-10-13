export function dragStart(event: DragEvent) {
    const target = event.target as HTMLElement;
    event.dataTransfer?.setData('text/plain', target.innerText);
}

export function allowDrop(event: DragEvent) {
    event.preventDefault();
}

export function drop(event: DragEvent, callback: Function) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
        callback(data);
    }
}
