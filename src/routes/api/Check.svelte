<script lang="ts">
    export let checked: boolean;
    export let name: string;
</script>
<style>
    p {
        --color: red;
        --line-width: 3px;
        color: var(--color);
        position: relative;
        padding-left: var(--line-width);
        margin: 0;
    }
    .checked {
        --color: green;
    }

    p::before {
        content: "";
        display: inline-block;
        position: absolute;
        left: 0;
        background-color: var(--color);
        width: var(--line-width);
        height: 100%;
    }
</style>
<p class:checked={checked}>{name}</p>