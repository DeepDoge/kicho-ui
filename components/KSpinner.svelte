<script lang="ts">
    import type { Colors } from "../types/style/colors";
    export let color: Colors = "master";
</script>

<div class="lds-ring" style:color="var(--k-color-{color})">
    <div />
    <div />
    <div />
    <div />
</div>

<style>
    .lds-ring {
        display: inline-block;
        align-self: center;
        justify-self: center;
        width: 1.25em;
        aspect-ratio: 1/1;
    }
    .lds-ring div {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 0.15em solid currentColor;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: currentColor transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
