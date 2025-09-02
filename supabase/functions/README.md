## Supabase Edge Functions

We use Supabase edge functions to send transactional email using AWS SES.

### Setup

- Install latest Supabase CLI.
- Copy `.env.example` to `.env.local`.
- Open `functions` folder in a new window of your IDE because this is Deno and not Node/
- Install Deno plugins for your IDE.
- Configure prettier settings to point to parent node project.

### Running the Function

In the root of the project, run the following:

```shell
$ supabase functions serve my-function --env-file ./supabase/functions/.env.local
```

You can only run one function at a time.

Then, you can execute the function with the curl command given in the function itself.

### Deploying to Production

Deploy the function to the edge servers:

```shell
$ supabase functions deploy my-function
```

Make sure all secrets are defined. See the `.env.example` file for details.

```shell
$ supabase secrets set NAME1=VALUE1 NAME2=VALUE2
```
