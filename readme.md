# 🏗 CDK AWS Lambda CI/CD Pipeline

This repository provides an AWS CDK-based CI/CD pipeline for deploying AWS Lambda functions. It integrates Infrastructure as Code (IaC) with application source code, making deployments efficient and scalable.

---

## 📌 Supported Languages

| CDK Framework  | Current Support | Future Support |
|---------------|----------------|---------------|
| CDK (TypeScript) | ✅ Python | 🔜 Java, Node.js (TypeScript) |
| CDK (Python) | ❌ | 🔜 Python, Java, Node.js (TypeScript) |
| CDK (Java) | ❌ | 🔜 Python, Java, Node.js (TypeScript) |

---

## 📂 Project Structure

```
cdk-typescript/
│── withcode/
│   ├── infrastructure/  # AWS CDK Infrastructure as Code
│   ├── src/             # Lambda Application Code
```

### 🔹 What is `withcode/`?
A monorepo structure where both CDK infrastructure code and application source code reside together, enabling seamless deployments.

---

## ⚙️ Setup & Usage

### Step 1️⃣: Clone the Repository
```sh
git clone https://git-codecommit.<region>.amazonaws.com/v1/repos/your-repo-name
cd your-repo-name
```

### Step 2️⃣: Copy Project Files
Copy all contents inside `withcode/` into your cloned repository.

### Step 3️⃣: Configure Infrastructure
Update the `infrastructure-config.json` file:

```json
{
  "projectName": "your-project-name",
  "repositoryName": "your-repo-name",
  "branchName": "your-branch",
  "lambdaRuntime": "python3.9",
  "lambdaHandlerName": "app.lambda_handler",
  "lambdaAssetPath": "src/"
}
```

**Configuration Fields:**
- `projectName` - Name of the project.
- `repositoryName` - Name of the repository.
- `branchName` - Branch where the pipeline runs.
- `lambdaRuntime` - Runtime environment for the Lambda function.
- `lambdaHandlerName` - The entry point handler for Lambda.
- `lambdaAssetPath` - Path to the application source code.

### Step 4️⃣: Install Dependencies
```sh
npm install -g aws-cdk  # Install AWS CDK globally
npm ci                  # Install project dependencies
```

### Step 5️⃣: Update Application Code
Replace the contents of `src/` with your Lambda function.

✅ **Example Python Lambda (`src/app.py`)**

```python
import json

def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Hello from Lambda!"})
    }
```

### Step 6️⃣: Synthesize the CDK Stack
```sh
cdk synth
```
This generates a CloudFormation template.

### Step 7️⃣: Deploy
```sh
cdk deploy
```
Deploys AWS resources and the Lambda function.

---

## 🔧 Prerequisites
- ✅ Node.js v21+ installed
- ✅ AWS CLI configured (`aws configure`)
- ✅ AWS CDK installed (`npm install -g aws-cdk`)
- ✅ Application code ready (without external dependencies)

---

## 🛠 Troubleshooting

### ❌ CDK Synth Fails?
Run:
```sh
aws configure
```
Ensure correct AWS credentials are set up.

### ❌ Deployment Fails?
Check if your IAM user has the required permissions.

### ❌ Application Code Doesn’t Update?
- Verify your `src/` folder contains the latest code.
- Re-run:
  ```sh
  cdk deploy
  ```

### ❌ Missing Dependencies?
Ensure you have installed all required dependencies:
```sh
npm ci
```

---

## 🚀 Conclusion
This CDK-based Lambda deployment pipeline enables seamless infrastructure and application updates. Integrate it with a CI/CD system for automated deployments and scalability.

Happy coding! 🎉

