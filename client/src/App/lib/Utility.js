export function ConvertToHTML(elements) {
    let html = '';
    elements.map((element) => {
        return (
            html += element.outerHTML);
    })

    return html;
}