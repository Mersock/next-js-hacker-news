import fetch from 'isomorphic-fetch';
import Error from 'next/error';

class Index extends React.Component {
    static async getInitialProps() {
        let stories;
        try {
            const response = await fetch('http://node-hnapi.herokuapp.com/news?page=1');
            stories = await response.json();
        } catch (error) {
            console.log(error)
            stories = [];
        }


        return { stories };
    }

    render() {
        const { stories } = this.props;
        if (stories == 0) {
            return <Error statusCode={503} />
        }
        
        const storyList = stories.map(story => (
            <h2 key={story.id}>{story.title}</h2>
        ));

        return (
            <div>
                <h1>Next Js</h1>
                {storyList}
            </div>)

    }
}

export default Index;