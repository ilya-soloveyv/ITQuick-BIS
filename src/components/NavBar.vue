<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand>ITQuick BIS</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/exprenses" active-class="active">
            Счета
          </b-nav-item>
          <b-nav-item to="/operational" active-class="active">
            Операционные дни
          </b-nav-item>
          <b-nav-item to="/transaction" active-class="active">
            Операции
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
