interface DynamicProps {
    params: {
        dynamic: string[];
    }
    searchParams: {
        [key: string]: string;
    }
}

export default function dynamic(props: DynamicProps) {
    console.log(props);

    return (<>
        <h1> example/[dynamic]: {props.params.dynamic}</h1>
        <h2> example/[dynamic]?uwu= {props.searchParams.uwu}</h2>
        <p> For test/any this component will be used </p>
    </>
    );
}