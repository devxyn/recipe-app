import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipe from './pages/SavedRecipe';
import Main from './component/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        { path: '/', element: <Main /> },
        {
          path: '/auth',
          element: <Auth />,
        },
        {
          path: '/create-recipe',
          element: <CreateRecipe />,
        },
        {
          path: '/saved-recipe',
          element: <SavedRecipe />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
