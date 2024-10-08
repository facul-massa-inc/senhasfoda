<script lang="ts">
    import Check from "./api/Check.svelte";

    let password = "";
    let showPassword = false;

    function handlePassword(event: Event) {
        password = (<HTMLInputElement>event.target).value;
    }

    interface StrengthCheck { name: string, check: (pass: string) => boolean };
    let strengthChecks: {[id: string]: StrengthCheck} = {
        hasUppercase: { name: "Letra maiúscula", check: (pass: string) => /[A-Z]/.test(pass) },
        hasLowercase: { name: "Letra minúscula", check: (pass: string) => /[a-z]/.test(pass) },
        hasNumber: { name: "Tem número", check: (pass: string) => /[0-9]/.test(pass) },
        hasSpecial: { name: "Caractere especial", check: (pass: string) => /[^A-Za-z0-9]/.test(pass) },
        isLongEnough:  { name: "No mínimo 8 caracteres", check: (pass: string) => pass.length >= 8 },
    };

    async function isCommon(pass: string) {
        return await (await fetch("/api/iscommon", { 
            method: "post", headers: { "Content-Type": "text/plain" }, body: pass
        })).text() === "true";
    }

    interface CheckResult { common: boolean, time: number }
    let checkResult: CheckResult;
    async function checkPassword(pass: string) {
        if(await isCommon(pass)) {
            checkResult = { common: true, time: 0 };
            return;
        }
        checkResult = { common: false, time: 0 };
    }

    function resultToText(result: CheckResult) {
        if(checkResult.common) {
            return "Sua senha é considerada uma senha comum e será quebrada instantaneamente!";
        }
        return "todo";
    }

    function isValidToEnter(pass: string) {
        return !!pass;
    }

    function handleEnter(event: KeyboardEvent) {
        if(isValidToEnter(password) && event.key === "Enter") checkPassword(password);
    }
</script>

{#each Object.values(strengthChecks) as check}
    <Check name={check.name} checked={check.check(password)} />
{/each}
<input type={showPassword ? "text" : "password"} placeholder="Senha" on:input={handlePassword} on:keypress={handleEnter}>
<input type="checkbox" bind:checked={showPassword}>
<button disabled={!isValidToEnter(password)} on:click={() => checkPassword(password)}>Checar</button>
<p>{#if !!checkResult}{resultToText(checkResult)}{/if}</p>