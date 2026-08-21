import * as greenlet from "https://cdn.jsdelivr.net/npm/greenlet@1.1.0/+esm";
import * as shiki from "https://cdn.jsdelivr.net/npm/shiki@4.4.3/+esm";
/**
https://www.jsdelivr.com/package/npm/age-encryption
https://www.jsdelivr.com/package/npm/shiki
https://www.jsdelivr.com/package/npm/greenlet
*/

const SESSION_KEY = "blog-enc-password";

async function decrypt(armorText, password) {
    const age = await import("https://cdn.jsdelivr.net/npm/age-encryption@0.3.0/+esm");
    const file = age.armor.decode(armorText);
    const decrypter = new age.Decrypter();
    decrypter.addPassphrase(password);
    return decrypter.decrypt(file, "text");
}
// run in a Web Worker，避免 scrypt 解密阻塞主线程
const decryptAsync = greenlet.default(decrypt);

async function highlight(preEl, plain, format) {
    preEl.outerHTML = await shiki.codeToHtml(plain, {
        lang: format in shiki.bundledLanguages ? format : "text",
        theme: "catppuccin-mocha",
    });
}

async function doUnlock(block, password) {
    const codeEl = block.querySelector("code");
    const plain = await decryptAsync(codeEl.textContent, password);

    codeEl.textContent = plain;
    block.classList.remove("enc-block", "cursor-pointer");

    highlight(codeEl.closest("pre"), plain, block.dataset.encFormat).catch((error) =>
        console.warn("enc: 语法高亮失败。", error),
    );
}

async function unlock(block) {
    const cachedPassword = sessionStorage.getItem(SESSION_KEY);
    if (cachedPassword) {
        try {
            return await doUnlock(block, cachedPassword);
        } catch {
            sessionStorage.removeItem(SESSION_KEY);
        }
    }

    const password = window.prompt("请输入密码解锁内容：");
    if (!password) return;

    try {
        await doUnlock(block, password);
        sessionStorage.setItem(SESSION_KEY, password);
    } catch (error) {
        console.warn("enc: 解密失败。", error);
        window.alert("密码不正确或密文已损坏");
    }
}

document.addEventListener("click", (event) => {
    const block = event.target.closest(".enc-block");
    // 防止点击复制按钮同时弹出密码框
    if (!block || event.target.closest(".copy-button")) return;

    unlock(block);
});
