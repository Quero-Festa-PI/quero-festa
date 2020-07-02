// pegar elemento do breadcrumb
let listaBreadcrumb = document.querySelector("div.row.breadcrumb ul");

function formatarPathname(pathname) {
    let pathnameParcial = ""
    // separando o pathname em partes
    let pathnameTotal = pathname.split("/").slice(1);
    if (pathnameTotal[0] == 'produtos' && Number(pathnameTotal[1])) {
        let li = `<li><a href="${pathname}">Visualizar Produto</a></li>`
        listaBreadcrumb.innerHTML = `${listaBreadcrumb.innerHTML}${li}`
        return;
    }
    if (pathnameTotal[0] == 'pedidos' && pathnameTotal[1] == 'checkout') {
        let li = `
        <li><a href="/pedidos/carrinho">Carrinho</a></li>
        <li><a href="/pedidos/checkout">Checkout</a></li>
        `
        listaBreadcrumb.innerHTML = `${listaBreadcrumb.innerHTML}${li}`
        return;
    }
    // para cada parte do pathname
    for (let i = 0; i < pathnameTotal.length; i++) {
        const pathnameAtual = pathnameTotal[i];
        const texto = formatarTexto(pathnameAtual);
        if (i > 0) {
            if (!Number(pathnameAtual)) {
                if (pathnameAtual == 'buscar' || pathnameAtual == 'confirmacao') {
                    let search = window.location.search
                    pathnameParcial = `${pathname}${search}`
                } else if (i + 2 == pathnameTotal.length) {
                    console.log(pathnameAtual)
                    if (Number(pathnameTotal[i + 1])) {
                        pathnameParcial = `${pathnameParcial}/${pathnameAtual}/${pathnameTotal[i + 1]}`
                    }
                } else {
                    pathnameParcial = `${pathnameParcial}/${pathnameAtual}`
                }
                let li = `<li><a href="${pathnameParcial}">${texto}</a></li>`
                listaBreadcrumb.innerHTML = `${listaBreadcrumb.innerHTML}${li}`
            }
        } else {
            pathnameParcial = `${pathnameParcial}/${pathnameAtual}`
        }
    }
}

function formatarTexto(texto) {
    texto = texto.split("-");
    texto = texto.map(palavra => palavra[0].toUpperCase() + palavra.slice(1))
    texto = texto.join(" ");
    return texto;
}

let pathname = document.location.pathname;
if (listaBreadcrumb) {
    formatarPathname(pathname);
}