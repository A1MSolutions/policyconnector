<template>
    <div class="sidebar__filters">
        <slot name="title">
            <h2>Research a Subject</h2>
        </slot>
        <div class="sidebar-filters__container">
            <slot name="filters" />
        </div>
    </div>
</template>
