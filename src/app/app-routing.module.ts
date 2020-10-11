
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AllPostsComponent } from "./all-posts/all-posts.component";
import { FollowingComponent } from "./following/following.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { MyPostsComponent } from "./my-posts/my-posts.component";
import { NgModule } from "@angular/core";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { NoAuthGuard } from "./auth/no-auth-guard.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'allposts', component: AllPostsComponent, canActivate: [NoAuthGuard] },
  { path: 'following', component: FollowingComponent, canActivate: [NoAuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [NoAuthGuard] },
  { path: 'myposts', component: MyPostsComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
