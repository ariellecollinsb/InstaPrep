import React, {Component} from "react";

// reactstrap components
import {
  Container, CardColumns,
} from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";
import RandomImageHeader from "../components/Headers/RandomImageHeader";
import Footer from "../components/Footers/Footer.js";
import MealItem from "../components/Meals/MealItem.js";
import API from "../utils/API";

class SavedMeals extends Component {
    static contextType = UserContext;
  
    constructor(props) {
      super(props);
      this.state = {
        savedRecipes: []
      }
    }

    componentDidMount() {
        this.getSaved(this.state.user)
        this.getCurrent(this.state.user);
    }

    getSaved = (user) => {
        API.getSaved(user)
            .then(res => this.setState({ savedRecipes: res.data }))
            .catch(err => console.log(err))
    }

    getCurrent = (user) => {
        API.getCurrent(user)
            .then(res => this.setState({ currentList: res.data }))
            .catch(err => console.log(err))
    }

    handleDelete = id => {
        console.log(id)
        API.deleteSaved(id.id)
            .then(res => this.getSaved(this.state.user))
            .catch(err => console.log(err))
    }


    handleAdd = info => {

        if (this.state.currentList.length === 0) {
            API.createShoppingList(info)
                .then(res => {
                    this.setState({ currentList: res.data })
                    this.showAdded()
                    this.getCurrent(this.state.user)
                })
                .catch(err => console.log(err))
        } else {
            API.addIngredients(info)
                .then(res => {
                    this.setState({ currentList: res.data })
                    this.showAdded()
                    this.getCurrent(this.state.user)
                })
                .catch(err => console.log(err))
        }
    }



    render() {
        
        return (
            <>
                <Saved>
                    <div className="searchedRecipes">
                        <ul>
                            {this.state.savedRecipes.map(recipe => (
                                <RecipeCard
                                    key={recipe.url}
                                    database={true}
                                    saved={true}
                                    name={recipe.title}
                                    link={recipe.url}
                                    image={recipe.image}
                                    ingredients={recipe.ingredients}
                                    handleDelete={() => this.handleDelete({
                                        id: recipe._id
                                    })}
                                    handleReview={() => this.handleReview({
                                        id: recipe._id,
                                        name: recipe.title,
                                        url: recipe.url,
                                        defaultImage: recipe.image
                                    })}
                                    handleAdd={() => this.handleAdd({
                                        user: this.user.id,
                                        ingredients: recipe.ingredients,
                                        id: this.state.currentList.length === 1 ? this.state.currentList[0]._id : null
                                    })}
                                />
                            ))}


                        </ul>
                    </div>
                    <AddedModal
                        added={this.state.showAdded}
                    >
                    </AddedModal>
                </Saved>
            </>
        )
    }
}

SavedRecipes.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(SavedRecipes);