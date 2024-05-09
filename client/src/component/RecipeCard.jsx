/* eslint-disable react/prop-types */
const RecipeCard = ({ recipe, isRecipeSaved, saveRecipe, showDetails }) => {
  return (
    <div className='w-full md:w-{42%} lg:w-[30%] border bg-black rounded-xl' key={recipe._id}>
      <img className='h-80 w-full object-cover rounded-ss-xl rounded-se-xl' src={recipe.imageUrl} alt={recipe.name} />
      <div className='px-10 py-6 flex flex-col gap-2'>
        <div className={`flex ${!showDetails ? 'justify-between' : 'justify-center'} items-center`}>
          <h2 className='text-white text-2xl md:text-3xl font-bold'>{recipe.name}</h2>
          {!showDetails && (
            <button
              className={`bg-white px-5 py-2 text-xl font-semibold rounded-3xl border border-black ${
                !isRecipeSaved(recipe._id) && 'active:border active:border-white active:bg-black active:text-white'
              }`}
              disabled={isRecipeSaved(recipe._id)}
              onClick={() => saveRecipe(recipe._id)}>
              {!isRecipeSaved(recipe._id) ? 'Save' : 'Saved'}
            </button>
          )}
        </div>

        {showDetails && (
          <>
            <div>
              <h3 className='text-white text-xl font-semibold'>Cooking Time:</h3>
              <p className='text-white font-light'>{recipe.cookingTime} minutes</p>
            </div>
            <div>
              <h3 className='text-white text-xl font-semibold'>Ingredients:</h3>
              <ul className='ml-5'>
                {recipe.ingredients.map((ingredient, index) => (
                  <li className='text-white font-light list-disc' key={index}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='text-white text-xl font-semibold'>Instructions:</h3>
              <p className='text-white font-thin'>{recipe.instructions}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
