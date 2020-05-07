# form表单组件（1）基本功能
`form`表单分两节介绍，本节主要介绍`label-position`、`label-width`俩功能实现。<br/>

下一节注重介绍`form`表单中的表单校验

## 分析
`Form`表单总共两个组件，`el-form`、`el-form-item`。基本结构也比较简单，简化一下如下：<br/>
```vue
<!-- element-ui/package/form/src/form.vue -->
<template>
  <form class="el-form">
    <slot></slot>
  </form>
</template>
```
```vue
<template>
  <div class="el-form-item">
    <label>
      <!-- 文档中的Form-Item Slot -->
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="el-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>
```

## label-position	
<style>
  table td:first-child {
    min-width: 100px;
  }
</style>
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width` | string |  right/left/top            | right |

form组件中通过判断`labelPosition`动态添加`class`，通过css的选择器来动态控制label标签的`float`以及`text-align`来控制位置
```vue
<!-- Form -->
<template>
  <form class="el-form" :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
  ]">
    <slot></slot>
  </form>
</template>
<!-- FormItem -->
<template>
  <div class="el-form-item">
    <label class="el-form-item__label"></label>
    <div class="el-form-item__content"></div>
  </div>
</template>
```
```css
  .el-form--label-left .el-form-item__label {
    text-align: left;
  }
  .el-form--label-top .el-form-item__label {
    float: none;
  }
```

## label-width
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label-width | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto`。 | string | — | — |