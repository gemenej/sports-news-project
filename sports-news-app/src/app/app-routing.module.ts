import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/pages/home/home.component";
import { AboutComponent } from "./components/pages/about/about.component";
import { ContactComponent } from "./components/pages/contact/contact.component";
import { Page404Component } from "./components/pages/page404/page404.component";
import { CategoriesComponent } from "./components/pages/categories/categories.component";
import { SourcesComponent } from "./components/pages/sources/sources.component";
import { ArticleComponent } from "./components/article/article.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./components/pages/login/login.component";
import { SignupComponent } from "./components/pages/signup/signup.component";
import { SourcesListComponent } from "./components/pages/admin/sources-list/sources-list.component";
import { CategoriesListComponent } from "./components/pages/admin/categories-list/categories-list.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "categories/:category", component: CategoriesComponent },
  { path: "sources/:source", component: SourcesComponent },
  { path: "auth/login", component: LoginComponent },
  { path: "auth/signup", component: SignupComponent },
  { path: "news/:_id", component: ArticleComponent },
  {
    path: "admin/sources",
    component: SourcesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/categories",
    component: CategoriesListComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "" },
  { path: "404", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
