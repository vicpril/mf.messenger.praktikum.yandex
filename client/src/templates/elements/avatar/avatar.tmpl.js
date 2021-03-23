export default `
<img 
src="{{src}}"
alt="{{alt}}"

<v-if="id">
    id="{{id}}"
</v-if>

<v-if="css">
    class="{{css}}"
</v-if>
style="border-color: {{borderColor}}"
>`;