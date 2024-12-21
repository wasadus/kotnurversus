import { lazy } from "react";
import MainPage from "./MainPage";
import paths from "./paths";

const AdminPage = lazy(() => import("./AdminPage").then(module => ({ default: module.AdminPage })));
const ChallengesPage = lazy(() => import("./ChallengesPage").then(module => ({ default: module.ChallengesPage })));
const TourneysPage = lazy(() => import("./TourneysPage").then(module => ({ default: module.TourneysPage })));
const CreateTourneyPage = lazy(() => import("./CreateTourneyPage").then(module => ({ default: module.CreateTourneyPage })));
const EditTourneyPage = lazy(() => import("./EditTourneyPage").then(module => ({ default: module.EditTourneyPage })));
const TourneyPage = lazy(() => import("./TourneyPage").then(module => ({ default: module.TourneyPage })));
const RoundPage = lazy(() => import("./RoundPage").then(module => ({ default: module.RoundPage })));
const ProfilePage = lazy(() => import("./ProfilePage").then(module => ({ default: module.ProfilePage })));

export default {
  admin: {
    path: paths.admin.pathTemplate,
    Component: AdminPage,
  },
  challenges: {
    path: paths.challenges.pathTemplate,
    Component: ChallengesPage,
  },
  tourneys: {
    path: paths.tourneys.pathTemplate,
    Component: TourneysPage,
  },
  createTourney: {
    path: paths.createTourney.pathTemplate,
    Component: CreateTourneyPage,
  },
  editTourney: {
    path: paths.editTourney.pathTemplate,
    Component: EditTourneyPage,
  },
  tourney: {
    path: paths.tourney.pathTemplate,
    Component: TourneyPage,
  },
  round: {
    path: paths.round.pathTemplate,
    Component: RoundPage,
  },
  profile: {
    path: paths.profile.pathTemplate,
    Component: ProfilePage,
  },
  main: {
    path: paths.main.pathTemplate,
    Component: MainPage,
  },
};
