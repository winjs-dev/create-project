<template>
  <svg :class="['svg-icon', className]" aria-hidden="true">
    <use :xlink:href="'#icon-' + iconName" />
  </svg>
</template>

<script>
  export default {
    name: 'SvgIcon',
    props: {
      iconName: {
        type: String,
        required: true
      },
      className: {
        type: [String, Array],
        default: ''
      }
    }
  };
</script>

<style scope>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
    position: relative;
  }
</style>
